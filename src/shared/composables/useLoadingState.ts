import { computed, ref } from 'vue'

export function useLoadingState(initial = false) {
	const pendingCount = ref(initial ? 1 : 0)

	const isLoading = computed(() => pendingCount.value > 0)

	function start() {
		pendingCount.value += 1
	}

	function end() {
		if (pendingCount.value > 0) pendingCount.value -= 1
	}

	async function run<T>(fn: () => Promise<T>): Promise<T> {
		start()
		try {
			return await fn()
		} finally {
			end()
		}
	}

	return {
		isLoading,
		start,
		end,
		run,
	}
}
