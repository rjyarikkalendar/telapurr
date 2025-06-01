
// Utility to add tea prices via SQL
export const teaPricesSQL = `
-- Добавляем цены для новых чаев

-- Ye Shen Shan цены
INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '50_gramm', 7, 0
FROM teas t WHERE t.title = 'Ye Shen Shan'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '100_gramm', 14, 1
FROM teas t WHERE t.title = 'Ye Shen Shan'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '200_gramm', 28, 2
FROM teas t WHERE t.title = 'Ye Shen Shan'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '357_gramm', 50, 3
FROM teas t WHERE t.title = 'Ye Shen Shan'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

-- Lanin Tie Bin цены
INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '50_gramm', 12, 0
FROM teas t WHERE t.title = 'Lanin Tie Bin'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '100_gramm', 24, 1
FROM teas t WHERE t.title = 'Lanin Tie Bin'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '200_gramm', 48, 2
FROM teas t WHERE t.title = 'Lanin Tie Bin'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '357_gramm', 86, 3
FROM teas t WHERE t.title = 'Lanin Tie Bin'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

-- Lao Ban Zhang Da Shu Guntin цены
INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '50_gramm', 5, 0
FROM teas t WHERE t.title = 'Lao Ban Zhang Da Shu Guntin'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '100_gramm', 10, 1
FROM teas t WHERE t.title = 'Lao Ban Zhang Da Shu Guntin'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '200_gramm', 20, 2
FROM teas t WHERE t.title = 'Lao Ban Zhang Da Shu Guntin'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '357_gramm', 36, 3
FROM teas t WHERE t.title = 'Lao Ban Zhang Da Shu Guntin'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

-- Silver Needles цены
INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '50_gramm', 13, 0
FROM teas t WHERE t.title = 'Silver Needles'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '100_gramm', 25, 1
FROM teas t WHERE t.title = 'Silver Needles'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '200_gramm', 50, 2
FROM teas t WHERE t.title = 'Silver Needles'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '400_gramm', 100, 3
FROM teas t WHERE t.title = 'Silver Needles'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

-- Gu Shu Ren цены
INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '50_gramm', 11, 0
FROM teas t WHERE t.title = 'Gu Shu Ren'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '100_gramm', 22, 1
FROM teas t WHERE t.title = 'Gu Shu Ren'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '200_gramm', 44, 2
FROM teas t WHERE t.title = 'Gu Shu Ren'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '357_gramm', 79, 3
FROM teas t WHERE t.title = 'Gu Shu Ren'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

-- Imperial Gong Ting цены
INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '50_gramm', 8, 0
FROM teas t WHERE t.title = 'Imperial Gong Ting'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '100_gramm', 15, 1
FROM teas t WHERE t.title = 'Imperial Gong Ting'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '200_gramm', 30, 2
FROM teas t WHERE t.title = 'Imperial Gong Ting'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '357_gramm', 54, 3
FROM teas t WHERE t.title = 'Imperial Gong Ting'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

-- Lao Ban Zhang цены
INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '50_gramm', 11, 0
FROM teas t WHERE t.title = 'Lao Ban Zhang'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '100_gramm', 22, 1
FROM teas t WHERE t.title = 'Lao Ban Zhang'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '200_gramm', 44, 2
FROM teas t WHERE t.title = 'Lao Ban Zhang'
ON CONFLICT (tea_id, weight_type) DO NOTHING;

INSERT INTO tea_prices (tea_id, weight_type, price, price_index)
SELECT t.id, '357_gramm', 79, 3
FROM teas t WHERE t.title = 'Lao Ban Zhang'
ON CONFLICT (tea_id, weight_type) DO NOTHING;
`;
