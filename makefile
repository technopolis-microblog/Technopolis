.PHONY: watch
watch:
	denon run --allow-net ./src/main.ts

.PHONY: fmt
fmt:
	deno fmt ./src/*
