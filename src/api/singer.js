import jsonp from '@/util/jsonp'
import {commonParams, options} from './config'

export function getSingerList() {
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';

	const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
		platform: 'yqq',
		g_tk: 883783761
	});
	const opts = Object.assign({}, options, {
		value: 'GetSingerListCallback'
	})
	return jsonp(url, data, opts)
}