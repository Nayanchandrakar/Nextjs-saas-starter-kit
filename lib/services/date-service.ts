export class DateService {
  private static readonly INVITATION_EXPIRY = 7 * 24 * 60 * 60 * 1000
  private static readonly SUBSCRIPTION_EXPIRY = 30 * 24 * 60 * 60 * 1000

  constructor() {}

  static getInvitationExpiry() {
    return new Date(Date.now() + DateService.INVITATION_EXPIRY)
  }

  static checkInvitationExpiry(expiryDate: Date) {
    return new Date() > expiryDate
  }

  static getSubscriptionExpiry() {
    return new Date(Date.now() + DateService.SUBSCRIPTION_EXPIRY)
  }

  static isSubscriptionExpired(currentPeriodEnd: Date) {
    return currentPeriodEnd?.getTime() + 86_400_000 > Date.now()
  }

  static formatDate(
    date: Date | string | number,
    options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  ) {
    const d = new Date(date)
    return new Intl.DateTimeFormat("en-US", options).format(d)
  }
}
