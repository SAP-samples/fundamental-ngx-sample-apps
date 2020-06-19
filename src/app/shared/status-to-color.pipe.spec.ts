import { StatusToColorPipe } from './status-to-color.pipe';

describe('StatusToColorPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusToColorPipe();
    expect(pipe).toBeTruthy();
  });
});
