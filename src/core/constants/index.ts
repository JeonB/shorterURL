/* eslint-disable @typescript-eslint/no-magic-numbers */
export const SIXTY = 60 as const
export const ONE_HUNDRED = 100 as const
export const ONE_THOUSAND = 1000 as const
export const ZERO = 0
export const BASE62_RADIX = 62 as const
export enum HttpCode {
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	REDIRECT = 302,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500
}

export const BASE62_CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
