import { useEffect, useRef } from 'react';

type Func = (...args: any[]) => any;

export default function useInterval(callback: Func, delay: number | null) {
	const savedCallback = useRef<null | Func>(null);

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current?.();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}
