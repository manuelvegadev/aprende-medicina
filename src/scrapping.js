import * as cheerio from 'cheerio';
import * as fs from 'fs';

/**
 * @param {string} url
 * @param {string} filepath
 */
const downloadImage = async (url, filepath) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFileSync(filepath, buffer);
  console.log('Downloaded', filepath);
};

(async () => {
  const pageResponse = await fetch(
    'https://www.manualmoderno.com/apoyos_electronicos/9786074483987/ingr_9786074483987.php',
  );
  const pageHTML = await pageResponse.text();

  const $ = cheerio.load(pageHTML);

  const contents = [];

  $(`[id*="origen"]`).each((groupIndex, element) => {
    let [groupNumber, groupName] = $(element)
      .text()
      .split('.')
      .map((item) => item.trim());

    groupNumber = Number(groupNumber.split(' ').at(-1));

    contents.push({
      name: groupName,
      number: groupNumber,
      instrumentos: [],
    });

    const $instrumentos = $(element).next().find('p');

    $instrumentos.each(async (instrumentoIndex, element) => {
      // Is only the title that is for close the group
      if (instrumentoIndex === 0) {
        contents[groupIndex].instrumentos.push(undefined);
        return;
      }

      // Sometimes the p element is empty
      const text = $(element).text().trim();
      if (!text) {
        contents[groupIndex].instrumentos.push(undefined);
        return;
      }

      const [instrumentNumber, instrumentName] = text
        .split('.')
        .map((item) => item.trim());

      contents[groupIndex].instrumentos.push({
        number: instrumentNumber,
        name: instrumentName,
        img: '',
      });
      const image = $(element).find('a').attr('href');
      if (image) {
        // Is the link for close the group
        if (image.includes('javascript')) {
          contents[groupIndex].instrumentos[instrumentoIndex] = undefined;
          return;
        }

        const fileName = `${groupNumber}-${instrumentNumber}.${image
          .split('.')
          .at(-1)}`;

        contents[groupIndex].instrumentos[
          instrumentoIndex
        ].img = `images/${fileName}`;

        await downloadImage(
          'https://www.manualmoderno.com/apoyos_electronicos/9786074483987/' +
            image,
          `public/images/${fileName}`,
        );
      }
    });

    // Remove the undefined elements
    contents[groupIndex].instrumentos = contents[
      groupIndex
    ].instrumentos.filter((item) => item !== undefined);
  });

  fs.writeFileSync('src/contents.json', JSON.stringify(contents, null, 2));
})();
