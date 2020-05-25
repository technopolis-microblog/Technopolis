.PHONY: watch
watch:
	drun watch --entryPoint=./src/main.ts --cwd=./ --runtimeOptions=--allow-net

.PHONY: fmt
fmt:
	deno fmt ./src/*
