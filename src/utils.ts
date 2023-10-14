export function formatToDateOnly(dateTime: Date | null) : string {
    if (dateTime) {
        return dateTime.getUTCFullYear() + '-' +  ('0' + (dateTime.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + dateTime.getDay()).slice(-2)
    }
    return ""
}