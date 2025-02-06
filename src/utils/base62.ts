import { BASE62_CHARSET, ZERO, BASE62_RADIX } from '../core/constants'

/**
 * 숫자를 Base62로 변환
 */
export function encodeBase62(num: number): string {
	let result = ''
	while (num > ZERO) {
		result = BASE62_CHARSET[num % BASE62_RADIX] + result
		num = Math.floor(num / BASE62_RADIX)
	}
	return result || '0' // 0일 경우 "0" 반환
}

/**
 * Base62를 숫자로 변환
 */
export function decodeBase62(str: string): number {
	return str.split('').reduce((acc, char) => acc * BASE62_RADIX + BASE62_CHARSET.indexOf(char), ZERO)
}
