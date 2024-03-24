import {html, useState} from '../lib.js'
import History from './history.js'
import {saveToUrl} from '../save-load.js'
import {toggleMute} from '../sounds.js'

// @ts-ignore
const abandonGame = () => (window.location.href = window.location.origin)

/** @typedef {import('../../game/new-game.js').Game} Game */
/** @typedef {import('../../game/actions.js').State} State */

/**
 * Do something
 * @param {object} props
 * @param {Game} props.game
 * @param {State} props.gameState
 * @param {Function} props.onUndo
 * @returns {import('preact').VNode}
 */
export default function Menu({game, gameState, onUndo}) {
	const [muted, setMuted] = useState(false)

	console.log('gameState', gameState)
	function toggleSound() {
		toggleMute(!muted)
		setMuted(!muted)
	}

	return html`
		<div class="Container">
			<h1 center>Slay the Web</h1>
			<br />
			<br />
			<div class="Box">
				<ul class="Options">
					<li>
						<button
							onClick=${() => saveToUrl(gameState)}
							title="Your save game will be stored in the URL. Copy it"
						>
							Save
						</button>
					</li>
					<li>
						<button onClick=${() => abandonGame()}>Abandon Game</button>
					</li>
					<li>
						<label>Sound <input type="checkbox" checked=${!muted} onClick=${() => toggleSound()} /></label>
					</li>
				</ul>
			</div>

			<${History} future=${game.future.list} past=${game.past.list} onUndo=${onUndo} />
		</div>
	`
}
