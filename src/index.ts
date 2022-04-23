import {
    KmsKeyringBrowser,
    KMS,
    getClient,
    buildClient,
    CommitmentPolicy,
  } from '@aws-crypto/client-browser'
  import { fromBase64, toBase64 } from '@aws-sdk/util-base64-browser'

//do your crypto stuff

//declare const credentials: {accessKeyId: string, secretAccessKey:string, sessionToken:string }
const { encrypt, decrypt } = buildClient(
    CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT
)

//check the AWS Encryption SDK example-browser as there are better way to get credentials
const accessKeyId = '....';
const secretAccessKey = '...';

const clientProvider = getClient(KMS, {
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

const generatorKeyId = 'arn:aws:kms:....b'
console.log("using key arn ")
console.log(generatorKeyId);
console.log("-----------------------------------------------------------------------------------");
//const keyIds = ['arn:aws:kms:.....']
//const keyring = new KmsKeyringBrowser({ clientProvider, generatorKeyId, keyIds })

const keyring = new KmsKeyringBrowser({ clientProvider, generatorKeyId })

const context = {
    stage: 'demo',
    purpose: 'simple demonstration app',
    origin: 'us-west-1'
  }


//This string is a base64 cypherText - in this case, encrypted using the AWS Encryption SDK Java - BasicEncryptionExample
let resultBase64  = "AgV4ql1eFOD1CdKhr+liTEEWo+lF42PtSrsc6DsTFKJbaBAAhwACABFFeGFtcGxlQ29udGV4dEtleQATRXhhbXBsZUNvbnRleHRWYWx1ZQAVYXdzLWNyeXB0by1wdWJsaWMta2V5AERBdjJpT2JRbmlndEtPOEZSSENVdlQwREJTZWJsa21vYk9CZDd6TUVVS29TbE5DT2puelZ3WlN3QzBNNUZiSHBkQVE9PQABAAdhd3Mta21zAEthcm46YXdzOmttczp1cy1lYXN0LTE6NDI3Mzk2NDY4NjQwOmtleS8yN2E1ZjU0OS1iOTk3LTQ0OTctOGNlNi0xMDJmZWUxMTBmYmIAuAECAQB4F91YMldMauyehyfXto7AP5zD2KaWW4w+jAHGNSEj8dABMCVoPcRtaRPMFJsidI1mvAAAAH4wfAYJKoZIhvcNAQcGoG8wbQIBADBoBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDPNIaB3y6g8IRrQh2wIBEIA7BNfeDMImCUfFGRkm7/XOPiJs1FD/Hw91TClZN/b6tYonMH1VF3WgncBHWQP2+MfNAFcbmv4G8kPc4QACAAAQACgf97Dk66Fc9KUNanZ9jwxC5yib7mWVdz+1tjI22hsnLGWP/NaEhIRWmSotgGQNKf////8AAAABAAAAAAAAAAAAAAABAAAAN7MRfnVFEszkhTW+yyyvWnGr9m8Yg6qIgP5wPpr6jYkVP3c7M62BoiTB6F0NSzheZHJKH7o6jjK75Y3+ZiPZDk87tILBnwicAGcwZQIwfOutA4xcTEFqXN6LYSHfBeGB6mQqfCqIfbUpv+1g+5oOaCBATvFxwvdD4W2rHJDBAjEA4hiB4tEAAYbpyh4+ukQF4Bu08YG1UCuX5v5e9fg2kQTX1u3f0FlubXHIggwd1KlH";

console.log("base64 cypher text")
console.log(resultBase64);
console.log("-----------------------------------------------------------------------------------");

const result = fromBase64(resultBase64);

const { plaintext, messageHeader } = await decrypt(keyring, result)
const { encryptionContext } = messageHeader

// /* Verify the encryption context.
//    * If you use an algorithm suite with signing,
//    * the Encryption SDK adds a name-value pair to the encryption context that contains the public key.
//    * Because the encryption context might contain additional key-value pairs,
//    * do not add a test that requires that all key-value pairs match.
//    * Instead, verify that the key-value pairs you expect match.[](../../../../../../2BD73D3C-47D9-46F2-96BA-D77D3A37D19E)
//    */
// Object.entries(context).forEach(([key, value]) => {
//     if (encryptionContext[key] !== value)
//       throw new Error('Encryption Context does not match expected values')
//   })


console.log("utf8 plain text")
console.log(Buffer.from(plaintext).toString('utf8'));
console.log("-----------------------------------------------------------------------------------");

