.DEFAULT_GOAL := all

NPM := $(shell which npm)

all: install format lint test 
.PHONY: all

test:
	NODE_ENV=test $(NPM) test
.PHONY: test

lint:
	$(NPM) run lint
.PHONY: lint

format:
	$(NPM) run format
.PHONY: format

install:
	$(NPM) install
.PHONY: install