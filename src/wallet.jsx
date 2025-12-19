import { useEffect, useState } from "react"


function Wallet() {

    const [wallets, setWallets] = useState([])
    const [selectedWalletIndex, setSelectedWalletIndex] = useState(0)
    const [selectedWalletId, setSelectedWalletId] = useState(null)


    const [startDate, setStartDate] = useState("")
    const [endDate, setEndate] = useState("")
    const [transactions, setTransaction] = useState([])

    useEffect(() => {
        const today = new Date()
        const lastWeek = new Date()
        lastWeek.setDate(today.getDate() - 7)

        setStartDate(formatDate(lastWeek))
        setEndate(formatDate(today))

        fetchWallet()
    }, [])

    useEffect(() => {
        if (!selectedWalletId || !startDate || !endDate) return

        fetchTransactions(selectedWalletId, startDate, endDate)
    }, [selectedWalletId, startDate, endDate])

    const formatDate = (date) => {
        return date.toISOString().split("T")[0]
    }

    const fetchTransactions = async (wallet_id, start, end) => {
        try {
            const response = await (await fetch(`http://localhost:8080/api/users/wallet/${wallet_id}/range?startDate=${start}&endDate=${end}`)).json()
            setTransaction(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchWallet = async () => {
        try {
            const response = await (await fetch(`http://localhost:8080/api/users/19/wallet`)).json()
            setWallets(response.data)

            if (response.data.length > 0) {
                setSelectedWalletIndex(0)
                setSelectedWalletId(response.data[0].id)
            }

        } catch (err) {
            console.log(err)
        }
    }

    const handlerApplyFilter = () => {
        fetchTransactions(selectedWalletId, startDate, endDate)
    }


    const handlePrevWallet = () => {
        if (selectedWalletIndex === 0) return

        const newIndex = selectedWalletIndex - 1
        setSelectedWalletIndex(newIndex)
        setSelectedWalletId(wallets[newIndex].id)
    }

    const handleNextWallet = () => {
        if (selectedWalletIndex === wallets.length - 1) return

        const newIndex = selectedWalletIndex + 1
        setSelectedWalletIndex(newIndex)
        setSelectedWalletId(wallets[newIndex].id)
    }


    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number)
    }



    return (
        <div className="text-gray-300 max-w-3xl mx-auto pt-6">
            <h1 className="text-4xl font-bold mb-4 text-fuchsia-300">Finance</h1>

            {/* 🔹 Date Filter */}
            <div className="flex gap-3 mb-6">
                <div>
                    <label className="block text-sm mb-1">From</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-gray-700 p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">To</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndate(e.target.value)}
                        className="bg-gray-700 p-2 rounded"
                    />
                </div>

                <button onClick={handlerApplyFilter}
                    className="self-end bg-fuchsia-700 px-4 py-2 rounded hover:bg-fuchsia-800"
                >
                    Apply
                </button>
            </div>

            <div className="grid grid-cols-3 grid-rows-2 gap-3 text-gray-900">
                <div className="col-span-1 bg-gray-100 rounded-lg p-4 text-gray-400">
                    <h2 className="text-lg mb-3">Income</h2>
                    <p className="text-gray-900 text-2xl font-bold">{rupiah(transactions.totalIncome)}</p>
                </div>

                <div className="col-span-1 bg-gray-100 rounded-lg p-4 text-gray-400">
                    <h2 className="text-lg mb-3">Expense</h2>
                    <p className="text-gray-900 text-2xl font-bold">{rupiah(transactions.totalExpense)}</p>
                </div>

                {wallets.length > 0 && (
                    <div className="row-span-3 p-4 font-bold bg-gray-100 rounded-lg">
                        <div className="flex justify-between">
                            <h2 className="text-4xl uppercase">{wallets[selectedWalletIndex].name}</h2>
                            <div className="flex gap-5">
                                <button onClick={handlePrevWallet} disabled={selectedWalletIndex === 0}>&lt;</button>
                                <button onClick={handleNextWallet} disabled={selectedWalletIndex === wallets.length - 1}>&gt;</button>
                            </div>
                        </div>

                        <div className="px-3 py-12 mt-4 bg-blue-700 rounded-2xl">
                            <h2 className="text-xl text-gray-50">{rupiah(wallets[selectedWalletIndex].balance)}</h2>
                        </div>
                    </div>
                )}

                <div className="col-span-2 row-span-2 bg-gray-100 rounded-lg p-4 text-gray-400">
                    <h2 className="text-lg mb-3">Balance</h2>
                    <p className="text-gray-900 text-2xl font-bold">{rupiah(transactions.totalBalance)}</p>
                </div>

            </div>

        </div>
    )


}

export default Wallet