registerLayout(
	"center",
	class {
		async layout(children, edges, constraints, props) {
			/* width */
			const availableInlineSize = constraints.fixedInlineSize;
			/* height */
			const availableBlockSize = constraints.fixedBlockSize;

			/* get children */
			let childFragments = [];
			for (let child of children) {
				childFragments.push(await child.layoutNextFragment({ availableInlineSize, availableBlockSize }));
			}

			/* lets do some layout!! */
			let offset = 0;
			for (let fragment of childFragments) {
				fragment.blockOffset = (availableBlockSize - fragment.blockSize) / 2 + offset; /* */
				fragment.inlineOffset = (availableInlineSize - fragment.inlineSize) / 2;
				offset += fragment.blockSize; /* */
			}
			for (let fragment of childFragments) {
				fragment.blockOffset -= offset / 4; /* */
			}

			return {
				childFragments
			};
		}
		async intrinsicSizes() {}
	}
);

/*

GAP:
static get inputProperties() {
	return ['--gap'];
}

const gap = props.get("--gap").value || 0;

*/
