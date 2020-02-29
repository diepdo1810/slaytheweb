import Queue from '../game/queue.js'
import actions from '../game/actions.js'

export default function() {
	const future = new Queue()
	const past = new Queue()

	function enqueue(action) {
		future.addToTop({action})
	}

	// Runs the oldest actions and returns a new state.
	function dequeue(state) {
		const {action} = future.takeFromBottom()
		let nextState
		if (!action) return
		try {
			nextState = actions[action.type](state, action)
		} catch (err) {
			throw new Error(err)
		}
		past.addToTop({state, action})
		return nextState
	}

	function undo() {
		return this.past.takeFromTop()
	}

	return {
		enqueue,
		dequeue,
		undo,
		future,
		past
	}
}