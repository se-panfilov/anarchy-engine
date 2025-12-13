import type { TThirdPartyLicensesService } from '@Anarchy/Legal/Models';

import { ThirdPartyLicensesService } from '../Services/ThirdPartyLicensesService.ts';

const thirdPartyLicensesService: TThirdPartyLicensesService = ThirdPartyLicensesService();

thirdPartyLicensesService.generate().catch((e): void => {
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
});
