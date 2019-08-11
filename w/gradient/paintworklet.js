registerPaint(
	'bg',
	class {
		static get inputProperties() {
			return ['--from', '--to'];
		}
		paint(ctx, geom, props) {
			const [from, to] = [
				props.get('--from').toString(),
				props.get('--to').toString(),
			];

			const gradient = ctx.createLinearGradient(0, 0, geom.width, geom.height);
			gradient.addColorStop(0, from);
			gradient.addColorStop(1, to);

			ctx.fillStyle = gradient;

			ctx.fillRect(0, 0, geom.width, geom.height);
		}
		fill;
	}
);
