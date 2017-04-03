/* Copyright 2016 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/


// Type definitions common to multiple page modes.
type EnergySource = 'solar' | 'wind' | 'nuclear' | 'ng' | 'coal';

// Object literal types keyed by a fixed set of values.
type EnergySourceMap<T> = {[K in EnergySource]: T};

/**
 * Scenario outcome data.
 */
interface ScenarioOutcome {
  cost: number;
  co2: number;
}

/**
 * Aggregated scenario outcome details specific to a single energy source.
 */
interface EnergySourceOutcome {
  // Cost contribution of the energy source ($USD).
  cost?: number;

  // Amount of energy provided by source, ignoring demand (MWh).
  energy?: number,

  // Amount of energy consumed from the source by demand (MWh).
  consumed?: number,

  // Amount of fixed cost required for the energy source ($USD).
  fixedCost?: number;

  // Amount of variable cost required for the energy source ($USD).
  variableCost?: number;

  // Amount of CO2 emissions from the source (Mtonnes).
  co2?: number;

  // Maximum energy supply capacity (nameplate) of the source (MW).
  capacity?: number,
}

/**
 * Scenario outcome that also includes cost/co2 attributions by energy source.
 */
interface ScenarioOutcomeBreakdown<Keys extends string> extends ScenarioOutcome {
  breakdown: {[K in Keys]: EnergySourceOutcome}
}

/**
 * Common outcome summary data and configuration view.
 */
interface SummaryDataView<Keys extends string> {
  // The outcome summary for the energy profiles as currently allocated.
  summary: ScenarioOutcomeBreakdown<Keys>;

  // The population count of the geographic region for the scenario.
  population: number;
  baseline: ScenarioOutcomeBreakdown<Keys>;

  // The delta of the outcome to a pre-defined reference outcome.
  deltaToRef: {
    co2: number;
    cost: number;
  }
}

/**
 * Components that render views of the summary data.
 */
interface SummaryDataComponent<Keys extends string> {
  /**
   * Updates the component to render data within the new data view.
   *
   * @param view The new data view to render.
   **/
  update(view: SummaryDataView<Keys>);
}
