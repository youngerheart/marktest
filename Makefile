install:
	@npm --registry=http://registry.npm.taobao.org install; \

dev: install
	@mocha src/index.js;
