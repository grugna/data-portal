/* eslint-disable import/prefer-default-export */
export const GWASAppSteps = [
  {
    title: 'Select Study Population',
  },
  {
    title: 'Select Outcome Phenotype',
  },
  {
    title: 'Select Covariate Phenotype',
  },
  {
    title: 'Configure GWAS',
  },
];

export const isEnterOrSpace = (event) => event.key === 'Enter'
  || event.key === ' '
  || event.key === 'Spacebar'
  || event.keycode === '32'
  || event.keycode === '13';

// TODO - move this and function above to a .js file with a clearer name?
export const formatNumber = (number) => (Math.round(number * 10) / 10).toLocaleString();
export const minimumRecommendedCohortSize = 1000;
export const MESSAGES = {
  OVERLAP_ERROR: {
    title:
      'None of the persons in the (remaining) population of your selected cohorts overlap with the study population',
    messageType: 'warning',
  },
  NO_BINS_ERROR: {
    title:
      'None of the persons in the (remaining) population have a value for the selected concept',
    messageType: 'warning',
  },
  SMALL_COHORT_CAUTION: {
    title:
      'The total cohort size is small and can lead to low statistical power or cause the GWAS model to fail. Use caution when submitting to minimize computational resource usage.',
    messageType: 'caution',
  },
  SMALL_CONTROL_OR_CASE_CAUTION: {
    title:
      'The total cohort size of either your case or control groups that you have chosen is small and can lead to low statistical power or cause the GWAS model to fail. Use caution when submitting to minimize computational resource usage.',
    messageType: 'caution',
  },
};
