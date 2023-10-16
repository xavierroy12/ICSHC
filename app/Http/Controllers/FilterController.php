<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Filter; // Import your Filters model

class FilterController extends Controller
{
    public function saveFilters(Request $request)
    {
        $data = $request->input('filters');
        $from = $request->input('from'); // Get the 'from' information

        // Assuming your database table has a JSON column named 'filters'
        $savedFilter = new Filter();
        $savedFilter->filters = json_encode($data);
        $savedFilter->from = $from; // Set the 'from' value
        $savedFilter->save();

        return response()->json(['message' => 'Filters saved successfully']);
    }

    public function getFilters()
    {
        $filters = Filter::all();

        // You can loop through the filters and add the 'from' information to each filter
        foreach ($filters as $filter) {
            $filter->from = $filter->from;
        }

        return response()->json(['filters' => $filters]);
    }

}
