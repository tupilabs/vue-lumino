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

import LuminoWidget from '@/components/lumino-widget.ts'

describe('lumino-widget', () => {
  let widget, id, name, closable
  beforeEach(() => {
    id = 'id1'
    name = 'name1'
    closable = false
    widget = new LuminoWidget(id, name, closable)
  })
  it('should create a widget correctly', () => {
    expect(widget).not.toEqual(null)
  })
  it('should create the right event details', () => {
    const eventDetails = widget._getEventDetails()
    expect(eventDetails.detail.id).toEqual(id)
    expect(eventDetails.detail.name).toEqual(name)
    expect(eventDetails.detail.closable).toEqual(closable)
  })
})
