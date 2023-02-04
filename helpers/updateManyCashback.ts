export async function updateManyCashback(model: any, userId: string) {
    return await model.updateMany(
        {
            user: userId, condition: 'claimable cashback'
        },
        { condition: 'claimed cashback' }
    )
}