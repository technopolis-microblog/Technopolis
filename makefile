.PHONY: watch
watch:
	denon run ./src/main.ts

.PHONY: fmt
fmt:
	deno fmt ./src/*
