import { CellFill, Workbook, WorkbookColorInfo, Worksheet } from 'igniteui-angular-excel/ES5/excel.core';
import { TransactionInfo } from '../../../shared/types/transaction-info.model';

export function transactionInfoPage(workbook: Workbook, transactionInfo: TransactionInfo): void {
  const sheet = workbook.worksheets().add('TransactionInfo');
  sheet.getCell('A3').value = 'Gain / Loss on Sale';
  sheet.getCell('H3').value = 'Transaction Information';
  setHeaderStyle(sheet, 2);
  sheet.columns(7).width = 6000;
  sheet.columns(7).cellFormat.alignment = 3;

  setInfoCol(sheet);
  setDataCol(sheet, transactionInfo);
}

function setInfoCol(sheet: Worksheet): void {
  sheet.getCell('A4').value = 'Sale Proceeds';
  sheet.getCell('A5').value = 'Tax Basis of Holdings (Book value of Present Holdings)';
  sheet.getCell('A6').value = 'Gross Gain / Loss on this Transaction';
  sheet.getCell('A7').value = 'Tax Savings';
  sheet.getCell('A8').value = 'After Tax Net Gain / Loss';

  sheet.getCell('A9').value = 'Funds Available for Reinvestment';
  setHeaderStyle(sheet, 8);

  sheet.getCell('A10').value = 'Sale Proceeds';
  sheet.getCell('A11').value = 'Tax Savings';
  sheet.getCell('A12').value = 'Funds Available for Reinvestment';
  sheet.getCell('A13').value = 'Cost of Securities Purchased';
  sheet.getCell('A14').value = 'Funds Remaining (Required)';

  sheet.getCell('A15').value = 'Loss Recovery Time';
  setHeaderStyle(sheet, 14);

  sheet.getCell('A16').value = 'Change in Annual Revenue';
  sheet.getCell('A17').value = 'After Tax Net Gain / Loss';
  sheet.getCell('A18').value = 'Recovery Time (Yrs)';
  sheet.rows(17).cellFormat.font.bold = true;
  sheet.getCell('A19').value = 'Weighted Avg Life Present Holdings (Yrs)';
  sheet.getCell('A20').value = 'Difference';

  sheet.getCell('A21').value = 'Increased Return On Swap';
  setHeaderStyle(sheet, 20);

  sheet.getCell('A22').value = 'Change in Annual Revenue';
  sheet.getCell('A23').value = 'Weighted Avg Life Present Holdings (Yrs)';
  sheet.getCell('A24').value = 'Increased Revenue';
  sheet.getCell('A25').value = 'After Tax Net Loss';
  sheet.getCell('A26').value = 'Net Increased Revenue';
  sheet.rows(25).cellFormat.font.bold = true;

  sheet.getCell('A27').value = 'Break-Even Calculations';
  setHeaderStyle(sheet, 26);

  sheet.getCell('A28').value = 'After Tax Annual Revenue on Present Holding';
  sheet.getCell('A29').value = 'Annual Net Gain /(Loss) (Tax Adjusted)';
  sheet.getCell('A30').value = 'Annual AMount Recovered';
  sheet.getCell('A31').value = 'Funds Available for Reinvestment';
  sheet.getCell('A32').value = 'BreakEven Yield';
  sheet.rows(31).cellFormat.font.bold = true;

}


function setDataCol(sheet: Worksheet, info: TransactionInfo): void {
  sheet.getCell('H4').value = checkIfNegative(info.saleProceeds);
  sheet.getCell('H5').value = checkIfNegative(info.taxBasisOfHoldings);
  sheet.getCell('H6').value = checkIfNegative(info.grossGain);
  sheet.getCell('H7').value = checkIfNegative(info.taxSavings);
  sheet.rows(6).cells(7).cellFormat.font.colorInfo = WorkbookColorInfo.l_op_Implicit_WorkbookColorInfo_Color('red');
  sheet.getCell('H8').value = checkIfNegative(info.afterTaxNetGain);

  sheet.getCell('H10').value = checkIfNegative(info.saleProceeds);
  sheet.getCell('H11').value = checkIfNegative(info.taxSavings);
  sheet.rows(10).cells(7).cellFormat.font.colorInfo = WorkbookColorInfo.l_op_Implicit_WorkbookColorInfo_Color('red');
  sheet.getCell('H12').value = checkIfNegative(info.fundsAvailableForReinvest);
  sheet.getCell('H13').value = checkIfNegative(info.costOfSecuritiesPurchased);
  sheet.getCell('H14').value = checkIfNegative(info.fundsRemaining);

  sheet.getCell('H16').value = checkIfNegative(info.changeInAnnualRevenue);
  sheet.getCell('H17').value = checkIfNegative(info.afterTaxNetGain);
  sheet.getCell('H18').value = info.recoveryTime;
  sheet.getCell('H19').value = checkIfNegative(info.weightedAvgLife);
  sheet.getCell('H20').value = checkIfNegative(info.difference);

  sheet.getCell('H22').value = checkIfNegative(info.changeInAnnualRevenue);
  sheet.getCell('H23').value = info.weightedAvgLife;
  sheet.getCell('H24').value = checkIfNegative(info.increasedRevenue);
  sheet.getCell('H25').value = checkIfNegative(info.afterTaxNetGain);
  sheet.getCell('H26').value = checkIfNegative(info.netIncreasedRevenue);

  sheet.getCell('H28').value = checkIfNegative(info.afterTaxAnnualRevenue);
  sheet.getCell('H29').value = checkIfNegative(info.annualNetGain);
  sheet.getCell('H30').value = checkIfNegative(info.annualAmtRecovered);
  sheet.getCell('H31').value = checkIfNegative(info.fundsAvailableForReinvest);
  sheet.getCell('H32').value = info.breakEvenYield + '%';
}

function setHeaderStyle(sheet: Worksheet, row: number): void {
  sheet.rows(row).cellFormat.font.bold = true;
  sheet.rows(row).cellFormat.fill = CellFill.createSolidFill('#16C9EF');
}

export function checkIfNegative(val: number): string {
  return val < 0 ? `(${Math.abs(val).toLocaleString()})` : val.toLocaleString();
}
