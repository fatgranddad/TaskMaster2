// import { Controller } from "@hotwired/stimulus" をローカルインストールされたパッケージに変更
import { Controller } from "../../node_modules/@hotwired/stimulus/dist/stimulus.min.js";

export default class extends Controller {
  greet() {
    alert("Hello from Stimulus!");
  }
}
