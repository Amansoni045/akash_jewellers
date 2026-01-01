import prisma from "@/lib/prisma";

export async function getLivePricesData() {
    try {
        const rows = await prisma.livePrice.findMany({
            orderBy: { updatedAt: "desc" },
            take: 2,
        });

        if (!rows || rows.length === 0) {
            return null;
        }

        const current = rows[0];
        const previous = rows[1];

        const calc = (curr, prev) => {
            if (prev == null) return null;
            return {
                delta: curr - prev,
                percent: ((curr - prev) / prev) * 100,
            };
        };

        return {
            prices: {
                gold: current.gold,
                goldRTGS: current.goldRTGS,
                silver: current.silver,
            },
            diffs: {
                gold: calc(current.gold, previous?.gold),
                goldRTGS: calc(current.goldRTGS, previous?.goldRTGS),
                silver: calc(current.silver, previous?.silver),
            },
            updatedAt: current.updatedAt,
        };
    } catch (err) {
        console.error("getLivePricesData Error:", err);
        return null;
    }
}
