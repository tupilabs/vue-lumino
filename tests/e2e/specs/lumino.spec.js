/**
 * Copyright 2020 Bruno P. Kinoshita
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import HelloWorld from '@/components/example/HelloWorld'
import ColoredCircle from "@/components/example/ColoredCircle";

describe('Lumino component', () => {
  it('should display the example app loaded and with a default hello world widget', () => {
    cy.visit('/')
    cy
      .get('.lm-TabBar-tabLabel')
      .contains(HelloWorld.name)
      .should('be.visible')
  })
  it('should add a new colored circle widget', () => {
    cy.visit('/')
    cy
      .get('.lm-TabBar-tabLabel')
      .contains(HelloWorld.name)
      .should('be.visible')

    cy
      .get('.lm-TabBar-tabLabel')
      .contains(ColoredCircle.name)
      .should('not.be.visible')
    cy
      .get('#add-colored-circle-widget-button')
      .click()
    cy
      .get('.lm-TabBar-tabLabel')
      .contains(ColoredCircle.name)
      .should('be.visible')
  })
})
