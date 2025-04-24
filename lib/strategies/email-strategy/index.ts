import { MagicLinkStrategy } from "@/lib/strategies/email-strategy/email-providers"
import {
  EmailStrategy,
  EmailStrategyConfig,
  StrategyFactory,
} from "@/types/strategies/email-strategy-types"

class EmailStrategyContext<T> {
  constructor(private readonly strategy: EmailStrategy<T>) {}

  async send(params: T): Promise<void> {
    await this.strategy.send(params)
  }
}

class EmailStrategyFactory {
  private static strategies: StrategyFactory = {
    magicLink: () => new MagicLinkStrategy(),
  }

  static createStrategy<K extends keyof EmailStrategyConfig>(
    type: K,
  ): EmailStrategyContext<EmailStrategyConfig[K]> {
    return new EmailStrategyContext(this.strategies[type]())
  }
}

export const magicLinkService = EmailStrategyFactory.createStrategy("magicLink")
