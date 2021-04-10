registerLayout(
	'center',
	class {
		static get inputProperties() {
			return ['--gap'];
		}
		async layout(children, edges, constraints, props) {
			/* width */
			const availableInlineSize = constraints.fixedInlineSize;
			/* height */
			const availableBlockSize = constraints.fixedBlockSize;

			/* get children */
			let childFragments = [];
			for (let child of children) {
				childFragments.push(
					await child.layoutNextFragment({
						availableInlineSize,
						availableBlockSize,
					})
				);
			}

			/* lets do some layout!! */
			let offset = 0;
			for (let fragment of childFragments) {
				fragment.inlineOffset = (availableInlineSize - fragment.inlineSize) / 2;
				fragment.blockOffset = offset;
				offset += fragment.blockSize; /* */
			}

			const displace = availableBlockSize / 2 - offset / 2;
			for (let fragment of childFragments) {
				fragment.blockOffset += displace;
			}

			return {
				childFragments,
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

offset -= gap;

*/
