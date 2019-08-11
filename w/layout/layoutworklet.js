registerLayout(
	'center',
	class {
		*intrinsicSizes(children) {
			const childrenSizes = yield children.map(child => {
				return child.intrinsicSizes();
			});

			const maxContentSize = childrenSizes.reduce(
				(max, childSizes) => Math.max(max, childSizes.maxContentSize),
				0
			);
			const minContentSize = childrenSizes.reduce(
				(max, childSizes) => Math.max(max, childSizes.minContentSize),
				0
			);

			return { maxContentSize, minContentSize };
		}

		*layout(children, edges, constraints) {
			const availableInlineSize = constraints.fixedInlineSize;
			const availableBlockSize = constraints.fixedBlockSize;
			const childConstraints = { availableInlineSize, availableBlockSize };

			const childFragments = yield children.map(child => {
				return child.layoutNextFragment(childConstraints);
			});

			for (let fragment of childFragments) {
				fragment.blockOffset = 0;
				fragment.inlineOffset = (availableInlineSize - fragment.inlineSize) / 2;
			}
			return {
				childFragments,
			};
		}
	}
);

/*
let offset = 0;
fragment.blockOffset =
	(availableBlockSize - fragment.blockSize) / 2 + offset;
fragment.inlineOffset = (availableInlineSize - fragment.inlineSize) / 2;
offset += fragment.blockSize;
for (let fragment of childFragments) {
	fragment.blockOffset -= offset / 2;
}
*/
