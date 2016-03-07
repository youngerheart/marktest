install:
	@npm --registry=http://registry.npm.taobao.org install; \

dev: install
	@node bin/marktest.js example/index.json
