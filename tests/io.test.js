const {
    domain,
    makeRequest,
    populateTable,
    waitForServiceWorkers,
} = require('./lib/shared.js');
const timeout = 1000000000;
jest.setTimeout(timeout);

let page = null;

function FormDataMock() {
    this.append = jest.fn();
}
global.FormData = FormDataMock

beforeAll(async () => {
    page = (await browser.pages())[0];
    await page.goto(domain, { waitUntil: 'networkidle0' });
    // wait until service worker installs
    await waitForServiceWorkers(page);
    
});

function makeRequestAllInternalError(url, config, page) {
    return page.evaluate(
        (url, req) =>
            fetch(url, req)
                .then(res => { 
                    debugger; 
                    if(res.status == 500) 
                        return { ok: false };
                    else
                        return res.json();
                    })
                .catch(err => err),
        encodeURI(url),
        config
    );
}


// it is essential that the order of the top level describes is mainained,
// because of the async nature of indexed db and speed of puppeteer.
// indexed db does not keep up with puppeteer's instructions, which might create race conditions because of db blocks.
describe('Testing /io/in/ endpoint', () => {
    const endpoint = 'io/in/';

    // dsfdjsffhsdfh
    const buffer1 = new Uint8Array([100, 115, 102, 100, 106, 115, 102, 102, 104, 115, 100, 102, 104]);
    // This is a test file for Jest-Puppeteer.
    const buffer2 = new Uint8Array([84, 104, 105, 115, 32, 105, 115, 32, 97, 32, 116, 101, 115, 116, 32, 102, 105, 108, 101, 32, 102, 111, 114, 32, 74, 101, 115, 116, 45, 80, 117, 112, 112, 101, 116, 101, 101, 114, 46]);
    // Some other nonesense text.
    const buffer3 = new Uint8Array([83, 111, 109, 101, 32, 111, 116, 104, 101, 114, 32, 110, 111, 110, 101, 115, 101, 110, 115, 101, 32, 116, 101, 120, 116, 46]);
    
    const uploadTable = [
        { path: "/file1.txt", buffer: buffer1 },
        { path: "/file2.txt", buffer: buffer2 },
        { path: "/file3.txt", buffer: buffer3 }  
    ];

    describe('Testing POST', () => {
        test('Load main io page.', async () => {
            const req = {
                method: 'GET',
            };
            const url = `${domain}/io/in/?test=true`;
            let response = await makeRequestAllInternalError(url, req, page);

            expect(response.ok).toBeTruthy();
        });

        test(`Upload file1.txt, file2.txt, file3.txt into file system.`,
            async () => {
                const response = await makeRequestAllInternalError(
                    `${domain}/io/import`,
                    {
                        method: 'POST',
                        body: JSON.stringify(uploadTable),
                    },
                    page
                );

                let res = response.every(res => !(res.err in res));

                expect(res).toBeTruthy();
            }
        );

        test('Remove file1.txt. Should be Successful.', async () => {
            const req = {
                method: 'GET',
            };
            const url = `${domain}/io/remove/file1.txt?test=true`;
            let response = await makeRequestAllInternalError(url, req, page);

            expect(response.ok).toBeTruthy();
        });

        test('Remove file1.txt. Should be a Failure.', async () => {
            const req = {
                method: 'GET',
            };
            const url = `${domain}/io/remove/file1.txt?test=true`;
            let response = await makeRequestAllInternalError(url, req, page);

            expect(response.ok).toBeFalsy();
        });

        test('Add file4.txt from io/from/text route.', async () => {
            const req = {
                method: 'GET',
            };
            const text = encodeURIComponent("This is a testing text.");
            const url = `${domain}/io/from/text/file4.txt?text=${text}&test=true`;
            let response = await makeRequestAllInternalError(url, req, page);

            expect(response.ok).toBeTruthy();
        });

        test('Add file5.txt from io/from/dataurl route.', async () => {
            const req = {
                method: 'GET',
            };

            // This is a testing text.
            const datauri = "data:text/plain;charset=utf-8;base64,VGhpcyBpcyBhIHRlc3RpbmcgdGV4dC4=";
            const url = `${domain}/io/from/dataurl/file5.txt?dataUri=${datauri}&test=true`;
            let response = await makeRequestAllInternalError(url, req, page);

            expect(response.ok).toBeTruthy();
        });
    });
    
});
