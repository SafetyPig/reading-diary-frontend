export function formatToDateOnly(dateTime: Date | null): string {
    if (dateTime) {
        const year = dateTime.getFullYear();
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const day = dateTime.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    return ""
}