module.exports = {
    /**
     * @returns {Promise<unknown>}
     */
    execute(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}