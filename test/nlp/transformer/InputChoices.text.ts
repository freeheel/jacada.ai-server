import { expect } from 'chai';
import 'mocha';
import TestData from "../data/TestData";

import InteractionModelMapper from '../../../common/util/nlp/InteractModelMapper';
import TextInputModel from "../../../common/util/nlp/model/TextInputModel";
import ChoiceModel from "../../../common/util/nlp/model/ChoiceModel";

describe('Choices input should be identified by the mapper', () => {

  const testData = new TestData().testChoicesData;
  const mapper = new InteractionModelMapper();

  const mappedData = mapper.translate(testData);

  it('Mapped Data should contain choices input', () => {

    let found = false;

    mappedData.interact.map((item: any) => {
      if (item.type === ChoiceModel.name) {
        found = true;
      }
    });

    expect(found,'Did not find a choices input mapped').to.be.true;

  });


});


