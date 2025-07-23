const useSubmitSummary = () => {
    const percentage = (count: number, total: number) => {
        if (total === 0) return 0;
        return Math.round((count / total) * 100).toString();
    }
    const calcDays = (date: string): string => {
        const dueDate = new Date(date);
        const currentDate = new Date();
        dueDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        const timeDifference = dueDate.getTime() - currentDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference > 0 ? `${Math.abs(daysDifference)} days ` : "Due today";

    };
    return { calcDays , percentage};
}

export default useSubmitSummary
