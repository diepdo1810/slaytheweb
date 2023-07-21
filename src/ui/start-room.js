import {html, Component} from './lib.js'

export default class StartRoom extends Component {
	render() {
		return html`
			<h1 center medium>It begins…</h1>
			<ul class="Options">
				<li><button onclick=${() => this.props.onContinue()}>Open the map</button></li>
			</ul>
			<p center>
				<button onclick=${() => (window.location = window.location.origin)}>Leave</button>
			</p>
		`
	}
}