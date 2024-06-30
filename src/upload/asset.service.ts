import {
  BlobSASPermissions,
  BlobServiceClient,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { AssetDTO } from './dto';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AssetService {
  // upload assets for post
  async upload({ fileName }: AssetDTO): Promise<string> {
    try {
      // Initialize Azure Blob Service client
      const accountName = process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME;
      const accountKey = process.env.AZURE_BLOB_STORAGE_PRIMARY_KEY;
      const containerName = process.env.AZURE_BLOB_STORAGE_CONTAINER_NAME;
      const blobName = fileName; // filename sent from the client

      const sharedKeyCredential = new StorageSharedKeyCredential(
        accountName,
        accountKey,
      );
      const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        sharedKeyCredential,
      );
      const containerClient =
        blobServiceClient.getContainerClient(containerName);

      // Check if container exists
      if (!(await containerClient.exists())) {
        throw new HttpException(
          `Container '${containerName}' does not exist`,
          404,
        );
      }

      const blobClient = containerClient.getBlobClient(blobName);
      const permissions = new BlobSASPermissions();
      permissions.write = true;
      permissions.create = true;
      permissions.add = true;

      // Generate SAS token
      const sasToken = generateBlobSASQueryParameters(
        {
          containerName: containerName,
          blobName: blobName,
          permissions: permissions, // Write permission
          startsOn: new Date(),
          expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // 1 hour from now
        },
        sharedKeyCredential,
      ).toString();

      // Construct pre-signed URL
      const url = `${blobClient.url}?${sasToken}`;

      // Return the pre-signed URL
      return url;
    } catch (error) {
      throw new HttpException('Something went wrong', 500);
    }
  }
}
