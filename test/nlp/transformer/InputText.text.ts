import { expect } from 'chai';
import 'mocha';
import TestData from "../data/TestData";

import InteractionModelMapper from '../../../common/util/nlp/InteractModelMapper';
import TextInputModel from "../../../common/util/nlp/model/TextInputModel";

describe('TextInput should be identified by the mapper', () => {

  const testData = new TestData().testInputData;
  const mapper = new InteractionModelMapper();

  const mappedData = mapper.translate(testData);

  it('Mapped Data should contain text input', () => {

    let found = false;

    mappedData.interact.map((item: any) => {
      if (item.type === TextInputModel.name) {
        found = true;
      }
    });

    expect(found,'Did not find a text input mapped').to.be.true;

  });


});


