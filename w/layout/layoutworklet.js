registerLayout(
	'center',
	class {
		async layout(children, edges, constraints) {
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

			return {
				childFragments,
			};
		}

		async intrinsicSizes() {}
	}
);

/*
VERTICAL ONLY
for (let fragment of childFragments) {
	fragment.inlineOffset = (availableInlineSize - fragment.inlineSize) / 2;
}

W/ADJUSTS REPLACE
let offset = 0;
for (let fragment of childFragments) {
	fragment.inlineOffset = (availableInlineSize - fragment.inlineSize) / 2;
	fragment.blockOffset = offset;
	offset += fragment.blockSize;
}


FINALE:
const displace = availableBlockSize / 2 - offset / 2;
for (let fragment of childFragments) {
	fragment.blockOffset += displace;
}


*/
