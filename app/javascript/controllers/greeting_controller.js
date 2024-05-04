// import { Controller } from "@hotwired/stimulus" をローカルインストールされたパッケージに変更
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  greet() {
    alert("Hello from Stimulus!");
  }
}