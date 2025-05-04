export class DateService {
  private static INVITATION_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000
  constructor() {}

  static getInvitationExpiry() {
    return new Date(Date.now() + DateService.INVITATION_EXPIRY_TIME)
  }

  static checkInvitationExpiry() {
    return new Date()
  }
}
