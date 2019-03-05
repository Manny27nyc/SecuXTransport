// @flow
export const StatusCodes = {
  // FAIL_ERROR: 0x5001,
  // CLS_ERROR: 0x5002,
  // INS_ERROR: 0x5003,
  // OK: 0x9000
  FAIL_ERROR: '5001',
  CLA_ERROR: '5002',
  INS_ERROR: '5003',
  OK: '9000'
}

// export function getStatusMessage(code: number): ?string {
//   if (code >= 0x6f00 && code <= 0x6fff) {
//     return 'Internal error, please report';
//   }
//   return null;
// }

export function TransportError (message: string, id: string) {
  this.name = 'TransportError'
  this.message = message
  this.id = id
}
// $FlowFixMe
TransportError.prototype = new Error()

/**
 * Error thrown when response returned a non success status.
 * And statusCode is defined in this library.
 */
export class TransportStatusError extends Error {
  constructor (statusCode: string) {
    super()
    this.name = 'TransportStatusError'
    console.log(typeof statusCode, statusCode)
    const statusText = Object.keys(StatusCodes).find(k => StatusCodes[k] === statusCode) || 'UNKNOWN_ERROR'
    this.message = `Secux device: ${statusText} (0x${statusCode})`
    this.statusCode = statusCode
    this.statusText = statusText
    this.stack = new Error().stack
  }
}

export default class Transport {
  static +isSupported: () => Promise<boolean>;

  static +open: () => Promise<Transport>;

  +sendApdu: (apdu: Buffer) => Promise<Buffer>;

  /**
   * close the exchange with the device.
   * @return a Promise that ends when the transport is closed.
   */
  +close: () => Promise<void>;

  /**
   * wrapper on top of exchange to simplify work of the implementation.
   * @param cla
   * @param ins
   * @param p1
   * @param p2
   * @param data
   * @param statusList is a list of accepted status code (shorts). [0x9000] by default
   * @return a Promise of response buffer
   */
  // send = async (
  //   cla: number,
  //   ins: number,
  //   p1: number,
  //   p2: number,
  //   data: Buffer = Buffer.alloc(0),
  //   statusList: Array<number> = [StatusCodes.OK]
  // ): Promise<Buffer> => {
  //   if (data.length >= 256) {
  //     throw new TransportError(
  //       `data.length exceed 256 bytes limit. Got: ${data.length} DataLengthTooBig`
  //     );
  //   }
  // const response = await this.exchange(
  //   Buffer.concat([
  //     Buffer.from([cla, ins, p1, p2]),
  //     Buffer.from([data.length]),
  //     data
  //   ]),
  // );
  // const sw = response.readUInt16BE(response.length - 2);
  // if (!statusList.some(s => s === sw)) {
  //   throw new TransportStatusError(sw);
  // }
  // return response;
  // };

  // static ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
  // static ErrorMessage_NoDeviceFound = "No Ledger device found";
}
