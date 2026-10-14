export interface AffidavitDetails {
  applicantName: string;
  fatherOrHusbandName: string;
  residenceAddress: string;
  yearsInDelhi: number;
  annualFamilyIncome: string;
  incomeSources: string;
  purpose: string;
}

export function generateDelhiIncomeAffidavit(details: AffidavitDetails): string {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `================================================================================
FORM ANNEXURE - I
PRESCRIBED SELF-DECLARATION AFFIDAVIT FOR ISSUANCE OF INCOME CERTIFICATE
REVENUE DEPARTMENT, GOVERNMENT OF NCT OF DELHI
================================================================================

I, ${details.applicantName.toUpperCase()}, Son/Daughter/Wife of Shri ${details.fatherOrHusbandName.toUpperCase()},
Resident of: ${details.residenceAddress}, Delhi,
Do hereby solemnly affirm and state on oath as under:

1. That I am a permanent / continuous resident of National Capital Territory of Delhi
   for the last ${details.yearsInDelhi} years.

2. That the total annual income of my family from all sources (including salary,
   business, agriculture, investments, and other legal sources) during the preceding
   financial year is ₹${details.annualFamilyIncome}/- (Rupees ${details.annualFamilyIncome} only).

3. That the primary source of my family income is: ${details.incomeSources}.

4. That I require this Income Certificate for the purpose of: ${details.purpose}.

5. That the facts stated above are true and correct to the best of my knowledge and
   belief. I understand that submitting false declarations before the Revenue Department
   is an offence punishable under Sections 177, 182, 199, and 200 of the Indian Penal Code.

Date: ${dateStr}
Place: Delhi (NCT)

DEPONENT SIGNATURE: ____________________________________
(${details.applicantName})

VERIFICATION:
Verified at Delhi on this ${dateStr} that the contents of above affidavit are true and
correct to my knowledge and nothing material has been concealed therefrom.

DEPONENT: _____________________________________________
================================================================================`;
}
