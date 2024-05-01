# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "https://cdn.skypack.dev/@hotwired/turbo@7.1.0/dist/turbo.min.js"
pin "@hotwired/stimulus", to: "https://cdn.skypack.dev/@hotwired/stimulus@3.0.0/dist/stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "https://cdn.skypack.dev/@hotwired/stimulus-loading@1.0.0/dist/stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"