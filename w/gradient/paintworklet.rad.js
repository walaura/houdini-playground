registerPaint(
	'bg',
	class {
		static get inputProperties() {
			return ['--from', '--to', '--donut'];
		}
		paint(ctx, geom, props) {
			const [from, to, donut] = [
				props.get('--from').toString(),
				props.get('--to').toString(),
				parseInt(props.get('--donut') || 0),
			];

			const gradient = ctx.createLinearGradient(0, 0, geom.width, geom.height);
			gradient.addColorStop(0, from);
			gradient.addColorStop(1, to);

			ctx.fillStyle = gradient;

			ctx.fillRect(0, 0, geom.width, geom.height);
			ctx.beginPath();
			ctx.fillStyle = 'black';
			ctx.globalCompositeOperation = 'xor';
			ctx.arc(geom.width / 2, geom.height / 2, donut, 0, 2 * Math.PI);
			ctx.fill();
		}
		fill;
	}
);
