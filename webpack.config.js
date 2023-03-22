// Node.js 모듈 path 불러오기
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const getAbsolutePath = (target) => path.resolve(__dirname, target);

const webpackMode = 'development'; //development, production

// CommonJS 방식의 모듈 내보내기
module.exports = {
	// 번들링 모드 설정
	mode: webpackMode,
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(svg|jpg)$/,
				loader: 'file-loader',
				options: {
					name: 'assets/[name].[ext]?[hash]', //[폴더명][파일명][ext]
				},
			},
		],
	},
	// 엔트리 파일 설정
	entry: './src/index.tsx',
	// 아웃풋 파일 출력 설정
	output: {
		// 파일 이름
		filename: webpackMode === 'production' ? '[name].min.js' : '[name].js',
		// 경로
		path: path.resolve(__dirname, 'dist'),
	},

	// 감시 활성화
	watch: true,
	// 감시 옵션 설정
	watchOptions: {
		aggregateTimeout: 200, // 다시 컴파일, 번들링 하기 전 지연 시간(ms) 설정
		ignored: /node_modules/, // 감시 제외 파일 또는 디렉토리 설정
		poll: 1000, // 폴링(Polling)을 켜거나, 폴링 간격 시간(ms) 설정
	},
	resolve: {
		// 생략 가능한 확장자
		extensions: ['.tsx', '.ts', '.js'],
		// 절대 경로 별칭 등록
		// alias: {
		//   "@modules": getAbsolutePath("src/modules/"),
		//   "@components": getAbsolutePath("src/components/"),
		// },
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			minify:
				process.env.NODE_ENV === 'production'
					? {
							collapseWhitespace: true,
							removeComments: true,
					  }
					: false,
		}),
		new CleanWebpackPlugin(),
		// CopyWebpackPlugin: 그대로 복사할 파일들을 설정하는 플러그인
		// 아래 patterns에 설정한 파일/폴더는 빌드 시 dist 폴더에 자동으로 생성됩니다.
		// patterns에 설정한 경로에 해당 파일이 없으면 에러가 발생합니다.
		// 사용하는 파일이나 폴더 이름이 다르다면 변경해주세요.
		// 그대로 사용할 파일들이 없다면 CopyWebpackPlugin을 통째로 주석 처리 해주세요.
	],
};
