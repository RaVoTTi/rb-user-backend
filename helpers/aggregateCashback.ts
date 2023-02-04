export async function aggregateCashback(model: any, userId: string, field: string) {
    return await model.aggregate([
        {
            $match: {
                $and: [{ user: userId, condition: 'claimable cashback' }]
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: `$${field}` }
            }
        }
    ]);
}