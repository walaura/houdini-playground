registerLayout(
	"center",
	class {
		*intrinsicSizes(children) {
			const childrenSizes = yield children.map(child => {
				return child.intrinsicSizes();
			});

			const maxContentSize = childrenSizes.reduce((max, childSizes) => Math.max(max, childSizes.maxContentSize), 0);
			const minContentSize = childrenSizes.reduce((max, childSizes) => Math.max(max, childSizes.minContentSize), 0);

			return { maxContentSize, minContentSize };
		}

		async layout(children, edges, constraints) {
			/* width */
			const availableInlineSize = constraints.fixedInlineSize;
			/* height */
			const availableBlockSize = constraints.fixedBlockSize;
			/* tell boundaries to children */
			let childFragments = [];
			for (let child of children) {
				childFragments.push(await child.layoutNextFragment({ availableInlineSize, availableBlockSize }));
			}
			for (let fragment of childFragments) {
				fragment.inlineOffset = 0;
				fragment.blockOffset = 0;
			}

			return {
				childFragments
			};
		}
	}
);

/*
W/ADJUSTS
let offset = 0;
for (let fragment of childFragments) {
	fragment.blockOffset =
		(availableBlockSize - fragment.blockSize) / 2 + offset;
	fragment.inlineOffset = (availableInlineSize - fragment.inlineSize) / 2;
	offset += fragment.blockSize;
}


FINALE:
			for (let fragment of childFragments) {
				fragment.blockOffset -= offset / 2;
			}

*/
